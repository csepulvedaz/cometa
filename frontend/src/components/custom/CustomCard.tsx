import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";

type CustomCardProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
};

const CustomCard = ({ title, description, children }: CustomCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-xl">{title}</CardTitle>
        <CardDescription className="text-center text-md">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">{children}</CardContent>
    </Card>
  );
};

export default CustomCard;
