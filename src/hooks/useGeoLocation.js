import { useState, useEffect } from "react";

export default function useGeoLocation() {
  const [location, setLocation] = useState({ city: null, error: null });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation({ city: null, error: "Geolocation not supported" });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();

          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.state ||
            "Unknown";

          setLocation({ city, error: null });
        } catch {
          setLocation({ city: null, error: "Failed to get city" });
        }
      },
      (err) => setLocation({ city: null, error: err.message })
    );
  }, []);

  return location;
}
