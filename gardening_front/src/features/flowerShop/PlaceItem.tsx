import {CardContent,CardTitle,CardHeader,Card} from "@/shared/shadcn/components/ui/card.tsx";
import {Separator} from "@/shared/shadcn/components/ui/separator.tsx";
import {Badge} from "@/shared/shadcn/components/ui/badge.tsx";


interface PlaceItemProps {
    index: number;
    place: {
        place_name: string;
        road_address_name?: string;
        address_name: string;
        phone?: string;
        place_url?:string;
    };
}

export function PlaceItem({ index, place }: PlaceItemProps) {
    return (
        <li className="flex items-start gap-2 p-2 hover:bg-muted rounded-md">
            {/* 마커 번호 표시 */}
            <Badge variant="outline" className="w-6 h-6 flex items-center justify-center">
                {index + 1}
            </Badge>

            {/* 장소 정보 카드 */}
            <Card className="flex-1">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold">{place.place_name}</CardTitle>
                </CardHeader>
                <CardContent className="text-xs space-y-1">
                    {place.road_address_name ? (
                        <>
                            <div>{place.road_address_name}</div>
                            <div className="text-gray-500">{place.address_name}</div>
                        </>
                    ) : (
                        <div>{place.address_name}</div>
                    )}
                    {place.phone && (
                        <>
                            <Separator className="my-1" />
                            <div className="text-gray-600">{place.phone}</div>
                        </>
                    )}
                    {place.place_url && (
                        <>
                            <Separator className="my-1" />
                            <a href={place.place_url} target="_blank" rel="noopener noreferrer">
                                카카오맵에서 보기
                            </a>

                        </>
                    )}
                </CardContent>
            </Card>
        </li>
    );
}
