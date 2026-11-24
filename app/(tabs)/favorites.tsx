import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "../../src/app/hooks";
import {
  clearAllFavorites,
  toggleFavorite,
} from "../../src/features/diary/diarySlice";
import DiaryCard from "../../src/components/DiaryCard";
import { COLORS, RADIUS, SHADOW, SPACE, TYPO } from "../../src/styles/tokens";

export default function FavoritesScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const favoriteEntries = useAppSelector((state) =>
    state.diary.entries.filter((entry) => entry.liked)
  );

  const handleClearAll = () => {
    Alert.alert(
      "Hapus Semua Favorite",
      "Semua tanda favorit pada diary akan dihapus.",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus Semua",
          style: "destructive",
          onPress: () => dispatch(clearAllFavorites()),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.subtitle}>Catatan Pilihan</Text>
            <Text style={styles.header}>Favorite</Text>
            <Text style={styles.counter}>
              {favoriteEntries.length} diary disimpan
            </Text>
          </View>

          {favoriteEntries.length > 0 && (
            <Pressable onPress={handleClearAll} style={styles.clearButton}>
              <Ionicons name="trash-outline" size={15} color={COLORS.danger} />
              <Text style={styles.clearButtonText}>Hapus Semua</Text>
            </Pressable>
          )}
        </View>

        <FlatList
          data={favoriteEntries}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            favoriteEntries.length === 0
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
                <Ionicons name="heart-outline" size={30} color={COLORS.danger} />
              </View>
              <Text style={styles.emptyTitle}>Belum Ada Diary Favorite</Text>
              <Text style={styles.emptySubtitle}>
                Tekan ikon hati pada kartu diary di halaman Home atau Detail
                untuk menyimpannya di sini.
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
  counter: {
    color: COLORS.muted,
    fontSize: TYPO.caption,
    marginTop: 2,
  },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: COLORS.dangerSoft,
    borderWidth: 1,
    borderColor: "#FECDD3",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: RADIUS.pill,
  },
  clearButtonText: {
    color: COLORS.danger,
    fontWeight: "700",
    fontSize: TYPO.caption,
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
    backgroundColor: COLORS.dangerSoft,
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