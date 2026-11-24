import { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import DiaryCard from "../../src/components/DiaryCard";
import { toggleFavorite } from "../../src/features/diary/diarySlice";
import { useAppDispatch, useAppSelector } from "../../src/app/hooks";
import { COLORS, RADIUS, SHADOW, SPACE, TYPO } from "../../src/styles/tokens";

const MOOD_FILTERS = ["Semua", "😊", "😢", "😡", "😌"];

export default function HomeScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [selectedMood, setSelectedMood] = useState("Semua");

  const entries = useAppSelector((state) => state.diary.entries);
  const totalDiary = useAppSelector((state) => state.diary.entries.length);
  const totalFavorite = useAppSelector(
    (state) => state.diary.entries.filter((item) => item.liked).length
  );

  const filteredEntries =
    selectedMood === "Semua"
      ? entries
      : entries.filter((item) => item.mood === selectedMood);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.subtitle}>Catatan Harianmu</Text>
            <Text style={styles.header}>Buku Harian</Text>
          </View>
          <View style={styles.headerBadge}>
            <Ionicons name="sparkles" size={20} color={COLORS.accent} />
          </View>
        </View>

        {/* Kartu Statistik */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, SHADOW.card]}>
            <View style={[styles.statIconBox, { backgroundColor: COLORS.accentSoft }]}>
              <Ionicons name="journal-outline" size={20} color={COLORS.accent} />
            </View>
            <View>
              <Text style={styles.statNumber}>{totalDiary}</Text>
              <Text style={styles.statLabel}>Total Diary</Text>
            </View>
          </View>

          <View style={[styles.statCard, SHADOW.card]}>
            <View style={[styles.statIconBox, { backgroundColor: COLORS.dangerSoft }]}>
              <Ionicons name="heart" size={20} color={COLORS.danger} />
            </View>
            <View>
              <Text style={[styles.statNumber, { color: COLORS.danger }]}>
                {totalFavorite}
              </Text>
              <Text style={styles.statLabel}>Total Favorite</Text>
            </View>
          </View>
        </View>

        {/* Filter Mood */}
        <View style={styles.filterSection}>
          <Text style={styles.sectionLabel}>Filter Suasana Hati</Text>
          <View style={styles.filterRow}>
            {MOOD_FILTERS.map((mood) => {
              const active = selectedMood === mood;
              return (
                <Pressable
                  key={mood}
                  onPress={() => setSelectedMood(mood)}
                  style={[
                    styles.filterChip,
                    active && styles.filterChipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterText,
                      active && styles.filterTextActive,
                    ]}
                  >
                    {mood}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <FlatList
          data={filteredEntries}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            filteredEntries.length === 0
              ? styles.emptyWrapper
              : { paddingBottom: SPACE.l }
          }
          renderItem={({ item }) => (
            <DiaryCard
              title={item.title}
              date={item.date}
              preview={item.preview}
              mood={item.mood}
              liked={item.liked}
              onToggleFavorite={() => dispatch(toggleFavorite(item.id))}
              onPress={() =>
                router.push({
                  pathname: "/detail/[id]",
                  params: { id: String(item.id) },
                })
              }
            />
          )}
          ListEmptyComponent={
            <View style={[styles.emptyBox, SHADOW.card]}>
              <View style={styles.emptyIconCircle}>
                <Ionicons name="book-outline" size={30} color={COLORS.accent} />
              </View>
              <Text style={styles.emptyTitle}>
                {entries.length === 0
                  ? "Belum Ada Catatan Diary"
                  : `Tidak Ada Diary dengan Mood ${selectedMood}`}
              </Text>
              <Text style={styles.emptySubtitle}>
                {entries.length === 0
                  ? "Buka tab Tambah di bawah untuk mulai mencatat cerita harimu."
                  : "Coba pilih filter mood lain atau tampilkan semua diary."}
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.s,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACE.m,
  },
  subtitle: {
    fontSize: TYPO.caption,
    color: COLORS.accent,
    fontWeight: "600",
    marginBottom: 2,
  },
  header: {
    fontSize: TYPO.h1,
    fontWeight: "800",
    color: COLORS.text,
  },
  headerBadge: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  statsRow: {
    flexDirection: "row",
    gap: SPACE.m,
    marginBottom: SPACE.m,
  },
  statCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACE.m,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    padding: SPACE.m,
  },
  statIconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.accent,
  },
  statLabel: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
  },
  filterSection: {
    marginBottom: SPACE.m,
  },
  sectionLabel: {
    fontSize: TYPO.caption,
    fontWeight: "600",
    color: COLORS.muted,
    marginBottom: SPACE.s,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACE.s,
  },
  filterChip: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterChipActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  filterText: {
    fontSize: TYPO.body,
    color: COLORS.text,
    fontWeight: "600",
  },
  filterTextActive: {
    color: "#FFFFFF",
  },
  emptyWrapper: {
    flexGrow: 1,
    justifyContent: "center",
  },
  emptyBox: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    padding: SPACE.xl,
    alignItems: "center",
  },
  emptyIconCircle: {
    width: 60,
    height: 60,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.accentSoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACE.m,
  },
  emptyTitle: {
    fontSize: TYPO.title,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SPACE.s,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: TYPO.body,
    color: COLORS.muted,
    textAlign: "center",
    lineHeight: 20,
  },
});