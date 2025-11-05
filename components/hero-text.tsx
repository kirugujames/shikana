import GradientText from "./GradientText";
interface Data{
    title:string;
}

export function Herotext({title}:Data) {
    return (
        <GradientText
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={3}
            showBorder={false}
            className="custom-class text-4xl md:text-6xl font-bold text-white mb-8 leading-tight text-balance"
        >
            {title}
        </GradientText>
    );
}