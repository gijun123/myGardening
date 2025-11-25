import { useState, useEffect } from "react";
import { PlaceItem } from "@/features/flowerShop/PlaceItem.tsx";

declare global {
    interface Window {
        kakao: any;
    }
}

export default function FlowerShop() {
    const [places, setPlaces] = useState<any[]>([]);



    useEffect(() => {
        const script = document.createElement("script");
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
            import.meta.env.VITE_KAKAO_JS_KEY
        }&autoload=false&libraries=services`;
        script.async = true;

        script.onload = () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById("map");
                if (!container) return;

                const map = new window.kakao.maps.Map(container, {
                    center: new window.kakao.maps.LatLng(37.5665, 126.9780),
                    level:3,
                });

                const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
                let markers: any[] = [];

                // ✅ 검색 결과 목록과 마커를 표출하는 함수
                function displayPlaces(placesData: any[]) {
                    setPlaces(placesData); // React state에 저장

                    // 기존 마커 제거
                    removeMarker();

                    const bounds = new window.kakao.maps.LatLngBounds();

                    for (let i = 0; i < placesData.length; i++) {
                        const placePosition = new window.kakao.maps.LatLng(
                            placesData[i].y,
                            placesData[i].x
                        );
                        const marker = addMarker(placePosition, i);
                        bounds.extend(placePosition);

                        // 마커 이벤트 등록
                        ((marker, title) => {
                            window.kakao.maps.event.addListener(marker, "mouseover", () => {
                                displayInfowindow(marker, title);
                            });
                            window.kakao.maps.event.addListener(marker, "mouseout", () => {
                                infowindow.close();
                            });
                            window.kakao.maps.event.addListener(marker, "click", () => {
                                // 새 탭에서 열기
                                window.open(placesData[i].place_url, "_blank");

                             });

                        })(marker, placesData[i].place_name);
                    }

                    map.setBounds(bounds);
                }

                // ✅ 마커 생성
                function addMarker(position: any, idx: number) {

                    const imageSrc =
                        "assets/flower-marker.png";
                    const imageSize = new window.kakao.maps.Size(50, 50);

                    const markerImage = new window.kakao.maps.MarkerImage(
                        imageSrc,
                        imageSize
                    );
                    const marker = new window.kakao.maps.Marker({
                        position,
                        image: markerImage,
                    });
                    marker.setMap(map);
                    markers.push(marker);
                    return marker;
                }

                //  마커 제거
                function removeMarker() {
                    for (let i = 0; i < markers.length; i++) {
                        markers[i].setMap(null);
                    }
                    markers = [];
                }

                // 인포윈도우 표시
                function displayInfowindow(marker: any, title: string) {
                    infowindow.setContent(
                        `<div style="padding:5px;font-size:12px;">${title}</div>`
                    );
                    infowindow.open(map, marker);
                }

                //  현재 위치 기준 검색
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const lat = position.coords.latitude;
                            const lng = position.coords.longitude;

                            const locPosition = new window.kakao.maps.LatLng(lat, lng);

                            map.setCenter(locPosition);

                            const marker = new window.kakao.maps.Marker({
                                position: locPosition,
                            });
                            marker.setMap(map);

                            const ps = new window.kakao.maps.services.Places();
                            ps.keywordSearch(
                                "꽃집",
                                (data: any, status: any) => {
                                    if (status === window.kakao.maps.services.Status.OK) {
                                        displayPlaces(data);
                                    }
                                },
                                {
                                    location: locPosition,
                                    radius: 2000, // 반경 2km 내 검색
                                }
                            );
                        },
                        (error) => {
                            console.error("현재 위치를 가져올 수 없습니다:", error);
                        }
                    );
                }
            });
        };

        document.head.appendChild(script);
    }, []);

    return (
        <div style={{ display: "flex" }}>
            <div
                id="menu_wrap"
                style={{ width: "250px", height: "400px", overflowY: "scroll" }}
            >
                <ul>
                    {places.map((place, i) => (
                        <PlaceItem key={i} index={i} place={place} />
                    ))}
                </ul>
            </div>
            <div id="map" style={{ width: "100%", height: "400px" }} />
        </div>
    );
}