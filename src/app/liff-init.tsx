"use client";
import { useEffect } from "react";
import liff from "@line/liff";

export default function LiffInit() {
	useEffect(() => {
		const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
		console.log("Initializing LIFF with ID:", liffId);
		if (!liffId) {
			console.error("LIFF ID is not defined.");
			return;
		}
		liff
			.init({ liffId })
			.then(() => {
				// LIFF initialized
			})
			.catch((err) => {
				console.error("LIFF init error:", err);
			});

		if (!liff.isLoggedIn()) {
			liff.login();
		}
	}, []);

	return null;
}
