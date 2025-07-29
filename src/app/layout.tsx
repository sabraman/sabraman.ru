// Since we have a locale-based layout, this root layout should not render HTML
// Instead it should just pass children to the locale layout
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
