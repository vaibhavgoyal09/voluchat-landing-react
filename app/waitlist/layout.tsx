import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Join Waitlist - VoluChat Early Access",
    description:
        "Join the waitlist for VoluChat. Get early access to the most powerful Instagram sales automation platform for Indian sellers.",
    keywords: [
        "VoluChat waitlist",
        "early access",
        "Instagram automation beta",
        "automation waitlist",
    ],
    openGraph: {
        title: "Join Waitlist - VoluChat Early Access",
        description: "Be among the first to automate your Instagram sales.",
    },
};

export default function WaitlistLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
