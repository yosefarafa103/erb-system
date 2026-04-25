import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
export function ChartCardSkeleton() {
    const heights = ["60%", "80%", "50%", "90%", "70%", "65%"];
    return (
        <Card>
            <CardHeader className="space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent>
                <div className="w-full h-[300px] flex items-end justify-between gap-2">
                    {heights.map((h, i) => (
                        <Skeleton
                            key={i}
                            className="w-full rounded-md"
                            style={{ height: h }}
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}