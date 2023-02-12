const ArtistCard = ({ artist, i }) => (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
        <div className="relative w-full h-56 group">
        <img src={artist.images[0].url} alt={artist.name} className="artistImg"></img>
        </div>
    </div>
);

export default ArtistCard;