"use client";
import { useEffect, useState } from "react";
import liff from "@line/liff";

interface Profile {
	userId: string;
	displayName: string;
	pictureUrl?: string;
	//statusMessage?: string;
}

export default function LiffProfile() {
	const [profile, setProfile] = useState<Profile | null>(null);

	useEffect(() => {
		async function initAndFetchProfile() {
			const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
			if (!liffId) return;

			//await liff.init({ liffId: "2007757051-xz3JPB8N" });
			await liff.init({ liffId });

			if (!liff.isLoggedIn()) {
				liff.login();
				return; // Wait for login redirect
			}

			try {
				const profile = await liff.getProfile();
				console.log("LIFF profile:", profile);
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
			{profile.pictureUrl && (
				<img src={profile.pictureUrl} alt={profile.displayName} width={100} />
			)}
			<div>{profile.displayName}</div>
		</div>
	);
}
