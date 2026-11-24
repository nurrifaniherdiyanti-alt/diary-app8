import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "../../src/app/hooks";
import {
  deleteDiary,
  toggleFavorite,
} from "../../src/features/diary/diarySlice";
import { COLORS, RADIUS, SHADOW, SPACE, TYPO } from "../../src/styles/tokens";

export default function DetailScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const entry = useAppSelector((state) =>
    state.diary.entries.find((item) => item.id === Number(id))
  );

  if (!entry) {
    return (
      <View style={styles.notFoundBox}>
        <Text style={styles.notFound}>Diary tidak ditemukan.</Text>
      </View>
    );
  }

  const confirmDelete = () => {
    Alert.alert(
      "Hapus Diary",
      "Diary akan dihapus dari Redux Store.",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          style: "destructive",
          onPress: () => {
            dispatch(deleteDiary(entry.id));
            router.replace("/");
          },
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[styles.articleCard, SHADOW.card]}>
        <View style={styles.topRow}>
          <View style={styles.moodBadge}>
            <Text style={styles.mood}>{entry.mood}</Text>
          </View>
          <View style={styles.datePill}>
            <Ionicons name="calendar-outline" size={14} color={COLORS.accent} />
            <Text style={styles.date}>{entry.date}</Text>
          </View>
        </View>

        <Text style={styles.title}>{entry.title}</Text>
        <View style={styles.divider} />
        <Text style={styles.body}>{entry.body}</Text>
      </View>

      <Pressable
        onPress={() =>
          router.push({
            pathname: "/edit/[id]",
            params: { id: String(entry.id) },
          })
        }
        style={styles.editButton}
      >
        <Ionicons name="create-outline" size={19} color={COLORS.accent} />
        <Text style={styles.editButtonText}>Edit Diary</Text>
      </Pressable>

      <Pressable
        onPress={() => dispatch(toggleFavorite(entry.id))}
        style={styles.favoriteButton}
      >
        <Ionicons
          name={entry.liked ? "heart-dislike-outline" : "heart-outline"}
          size={19}
          color="#FFFFFF"
        />
        <Text style={styles.white}>
          {entry.liked ? "Hapus dari Favorite" : "Tambah ke Favorite"}
        </Text>
      </Pressable>

      <Pressable onPress={confirmDelete} style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={19} color={COLORS.danger} />
        <Text style={styles.deleteButtonText}>Hapus Diary</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACE.l,
    gap: SPACE.m,
  },
  notFoundBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFound: {
    color: COLORS.muted,
    fontSize: 16,
  },
  articleCard: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    padding: SPACE.l,
    marginBottom: SPACE.s,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACE.m,
  },
  moodBadge: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: COLORS.accentSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  mood: {
    fontSize: 36,
  },
  datePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: COLORS.accentSoft,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: RADIUS.pill,
  },
  date: {
    color: COLORS.accent,
    fontWeight: "600",
    fontSize: TYPO.caption,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.text,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACE.m,
  },
  body: {
    fontSize: 15,
    lineHeight: 24,
    color: COLORS.text,
  },
  editButton: {
    flexDirection: "row",
    gap: 8,
    padding: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  editButtonText: {
    color: COLORS.accent,
    fontWeight: "700",
  },
  favoriteButton: {
    flexDirection: "row",
    gap: 8,
    padding: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.accent,
  },
  deleteButton: {
    flexDirection: "row",
    gap: 8,
    padding: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.dangerSoft,
    borderWidth: 1,
    borderColor: "#FECDD3",
  },
  deleteButtonText: {
    color: COLORS.danger,
    fontWeight: "700",
  },
  white: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});