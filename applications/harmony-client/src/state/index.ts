import { intoObservable, ObservableObject, observeHook } from "./state";
import { HarmonyClient } from "harmony-api";

interface ObservableClient {
    client: HarmonyClient;
}

export interface Preferences {
    theme: "light" | "dark";
    language: "en" | "es" | "fr";
    themeSystem: boolean;
    languageSystem: boolean;
}

export * from "./state";

export const client: ObservableObject<ObservableClient> = intoObservable({
    client: new HarmonyClient(""),
});
export const preferences: ObservableObject<Preferences> = intoObservable({
    theme: matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light",
    language: "fr",
    themeSystem: true,
    languageSystem: true,
});

Object.defineProperty(window, "clientStore", {
    value: client,
});

export const useClient = observeHook(() => client.client, client);
export const useTheme = observeHook(() => preferences.theme, preferences);
