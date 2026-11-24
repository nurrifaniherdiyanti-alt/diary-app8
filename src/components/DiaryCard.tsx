import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, RADIUS, SHADOW, SPACE, TYPO } from "../styles/tokens";

type Props = {
  title: string;
  date: string;
  preview: string;
  mood: string;
  liked: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
};

export default function DiaryCard({
  title,
  date,
  preview,
  mood,
  liked,
  onPress,
  onToggleFavorite,
}: Props) {
  return (
    <View style={[styles.card, SHADOW.card]}>
      <View style={styles.accentStrip} />

      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.main, pressed && { opacity: 0.75 }]}
      >
        <View style={styles.moodBox}>
          <Text style={styles.mood}>{mood}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>

          <View style={styles.dateRow}>
            <Ionicons
              name="calendar-outline"
              size={12}
              color={COLORS.accent}
            />
            <Text style={styles.date}>{date}</Text>
          </View>

          <Text style={styles.preview} numberOfLines={2}>
            {preview}
          </Text>
        </View>
      </Pressable>

      <Pressable
        onPress={onToggleFavorite}
        style={[styles.favoriteButton, liked && styles.favoriteButtonActive]}
        hitSlop={8}
      >
        <Ionicons
          name={liked ? "heart" : "heart-outline"}
          size={20}
          color={liked ? COLORS.danger : COLORS.muted}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    marginBottom: SPACE.m,
    overflow: "hidden",
    paddingRight: SPACE.m,
  },
  accentStrip: {
    width: 4,
    alignSelf: "stretch",
    backgroundColor: COLORS.accent,
  },
  main: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACE.m,
    padding: SPACE.m,
  },
  moodBox: {
    width: 54,
    height: 54,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.accentSoft,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  mood: {
    fontSize: 28,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: TYPO.title,
    fontWeight: "700",
    color: COLORS.text,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 3,
    marginBottom: 5,
  },
  date: {
    fontSize: TYPO.caption,
    color: COLORS.accent,
    fontWeight: "600",
  },
  preview: {
    fontSize: TYPO.body,
    color: COLORS.muted,
    lineHeight: 19,
  },
  favoriteButton: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  favoriteButtonActive: {
    backgroundColor: COLORS.dangerSoft,
    borderColor: "#FECDD3",
  },
});