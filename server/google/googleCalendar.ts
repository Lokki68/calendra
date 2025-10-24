"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { endOfDay, startOfDay } from "date-fns";
import { google } from "googleapis";

async function getOAuthClient(clerkUserId: string) {
  try {
    const client = await clerkClient();
    const { data } = await client.users.getUserOauthAccessToken(
      clerkUserId,
      "google"
    );

    if (data.length === 0 || !data[0].token) {
      throw new Error("No OAuth data or token found for the user");
    }

    const oAuthClient = new google.auth.OAuth2(
      process.env.GOOGLE_OAUTH_CLIENT_ID,
      process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      process.env.GOOGLE_OAUTH_REDIRECT_URL
    );

    oAuthClient.setCredentials({ access_token: data[0].token });

    return oAuthClient;
  } catch (error: any) {
    throw new Error(`Failed to get oAuth client: ${error.message}`);
  }
}

export async function getCalendarEventTimes(
  clerkUserId: string,
  { start, end }: { start: Date; end: Date }
): Promise<{ start: Date; end: Date }[]> {
  try {
    const oAuthClient = await getOAuthClient(clerkUserId);

    if (!oAuthClient) {
      throw new Error("OAuth client could not be obtained.");
    }

    const events = await google.calendar("v3").events.list({
      calendarId: "primary",
      eventTypes: ["default"],
      singleEvents: true,
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
      maxResults: 2500,
      auth: oAuthClient,
    });

    return (
      events.data.items
        ?.map((event) => {
          if (event.start?.date && event.end?.date) {
            return {
              start: startOfDay(new Date(event.start.date)),
              end: endOfDay(new Date(event.end.date)),
            };
          }

          if (event.start?.dateTime && event.end?.dateTime) {
            return {
              start: new Date(event.start.dateTime),
              end: new Date(event.end.dateTime),
            };
          }

          return undefined;
        })
        .filter(
          (date): date is { start: Date; end: Date } => date !== undefined
        ) || []
    );
  } catch (error: any) {
    throw new Error(`Failed to fetch calendar events: ${error.message}`);
  }
}
