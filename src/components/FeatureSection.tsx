import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, BarChart3, Users } from "lucide-react"
const data = [
    {
        title: "Багуудын удирдлагад зориулсан",
        description: "Багийн мэдээлэл, тоглогчдын статистик",
        icon: <Users className="h-6 w-6 text-primary" />,
        features: [
            "Өөрийн багийн мэдээлэл",
            "Тоглогчдын бүртгэл",
            "Тоглолтын статистик",
            "Багийн түүх",
        ],
    },
    {
        title: "Тоглогчдын хувьд",
        description: "Өөрийн карьерын түүхийг хуваалцах",
        icon: <Award className="h-6 w-6 text-primary" />,
        features: [
            "Өөрийн профайл үүсгэх",
            "Карьерын түүхийг хуваалцах",
            "Нийгмийн сүлжээнд холбогдох",
            "Хувийн статистик",
            "Хэрэглэгчийн дэмжлэг авах",
        ],
    },
    {
        title: "Хөгжөөн дэмжигчдийн хувьд",
        description: "Тоглогчид, багуудын мэдээлэлд хандах",
        icon: <BarChart3 className="h-6 w-6 text-primary" />,
        features: [
            "Багуудын мэдээлэл",
            "Тоглогчдын статистик",
            "Хөгжөөн дэмжигчдийн форум",
            "Тоглолтын дүнгийн мэдээ",
            "Тоглогчдын шагнал, амжилт",
            "Багийн амжилт",
        ],
    }
]
export function FeatureSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted flex items-center justify-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Бидний платформын онцлог
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              PlayerHubs нь тоглогчид, багууд болон хөгжөөн дэмжигчдийг нэгтгэн,
              тэдний мэдээллийг хуваалцах, харилцах, хамтран ажиллахад зориулагдсан платформ юм.
              Бидний зорилго бол тоглогчдын мэдээллийг төвлөрсөн байдлаар хадгалах,
              тэдний карьерийг дэмжих, хөгжөөн дэмжигчдийн хамтын ажиллагааг сайжруулах явдал юм.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {
                data.map((item, index) => (
                    <Card key={index} className="border-primary/20">
                        <CardHeader className="pb-2">
                            {item.icon}
                            <CardTitle className="text-xl">{item.title}</CardTitle>
                            <CardDescription>{item.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="grid gap-2 text-sm">
                                {item.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                ))
            }
        </div>
      </div>
    </section>
  )
}

