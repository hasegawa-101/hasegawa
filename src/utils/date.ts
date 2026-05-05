/**
 * 日付を "YYYY-MM-DD" 形式にフォーマットする
 */
export const formatDate = (date: Date): string => {
	return date
		.toLocaleDateString("ja-JP", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		})
		.split("/")
		.join("-");
};
