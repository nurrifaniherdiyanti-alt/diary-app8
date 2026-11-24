import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../src/app/store";
import { COLORS } from "../src/styles/tokens";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.background },
          headerTintColor: COLORS.text,
          headerTitleStyle: { fontWeight: "700" },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: COLORS.background },
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="detail/[id]"
          options={{
            title: "Detail Diary",
          }}
        />
        <Stack.Screen
          name="edit/[id]"
          options={{
            title: "Edit Diary",
          }}
        />
      </Stack>
    </Provider>
  );
}