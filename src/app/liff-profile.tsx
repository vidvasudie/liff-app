"use client";
import { useEffect, useState } from "react";
import liff from "@line/liff";

export default function LiffProfile() {
	const [profile, setProfile] = useState<liff.Profile | null>(null);

	useEffect(() => {
		async function initAndFetchProfile() {
			const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
			if (!liffId) return;

			await liff.init({ liffId });

			if (!liff.isLoggedIn()) {
				liff.login();
				return; // Wait for login redirect
			}

			try {
				const profile = await liff.getProfile();
				setProfile(profile);
			} catch (err) {
				console.error("LIFF getProfile error:", err);
			}
		}
		initAndFetchProfile();
	}, []);

	if (!profile) return <div>Loading profile...</div>;
	return (
		<div>
			<img src={profile.pictureUrl} alt={profile.displayName} width={100} />
			<div>{profile.displayName}</div>
		</div>
	);
}
