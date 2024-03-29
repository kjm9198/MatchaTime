import Image from 'next/image';

export const Heroes = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex items-center">
                <div className="relative w-[450px] h-[320px] sm:w-[450px] sm:h-[320px] md:h-[320px] md:w-[450px]">
                    <Image
                        src="/hero.webp"
                        fill
                        className="object-contain"
                        alt="Hero"
                    />
                </div>
            </div>
        </div>
    );
}