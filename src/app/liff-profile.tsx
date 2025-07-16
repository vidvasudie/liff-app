"use client";
import { useEffect, useRef, useState } from "react";
import liff from "@line/liff";

interface Profile {
	userId: string;
	displayName: string;
	pictureUrl?: string;
	//statusMessage?: string;
}

export default function LiffProfile() {
	const [profile, setProfile] = useState<Profile | null>(null);
	const initializedRef = useRef(false);

	useEffect(() => {
		const liffId = process.env.NEXT_PUBLIC_LIFF_ID || "";
		if (!liffId || initializedRef.current) return;

		initializedRef.current = true;

		console.log("Initializing LIFF with ID:", liffId);
		async function initLiff() {
			await liff.init({ liffId }).catch((err) => {
				console.error("LIFF init error:", err);
			});

			if (!liff.isLoggedIn()) {
				liff.login();
				return;
			}
		}
		initLiff();
	}, []);

	const handleGetProfile = async () => {
		if (!liff.isLoggedIn()) {
			liff.login();
			return;
		}
		try {
			const profile = await liff.getProfile();
			console.log("LIFF profile:", profile);
			setProfile(profile);
		} catch (err) {
			console.error("LIFF getProfile error:", err);
		}
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				minHeight: "50vh",
			}}
		>
			<div style={{ marginBottom: ".8rem" }}>
				<button
					onClick={handleGetProfile}
					style={{ padding: "10px 24px", fontSize: "16px" }}
				>
					Get Profile
				</button>
				{/* <button onClick={() => liff.logout()}>Logout</button> */}
			</div>
			{profile?.pictureUrl && (
				<img src={profile.pictureUrl} alt={profile.displayName} width={300} />
			)}
			<div>{profile?.displayName}</div>
			<div>[{profile?.userId}]</div>
		</div>
	);
}
