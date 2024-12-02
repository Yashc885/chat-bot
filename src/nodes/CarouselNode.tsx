import { useState } from "react";
import { NodeProps, Position } from "reactflow";
import CustomHandle from "../components/CustomHandle";

type CarouselNodeProps = {
  images?: { link: string; caption: string }[];
  onChange?: (newImages: { link: string; caption: string }[]) => void; // Optional callback to update images from parent
};

export type CarouselNodeType = {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: { images: { link: string; caption: string }[] };
};

export default function CarouselNode({ data, onChange }: NodeProps<CarouselNodeProps>) {
  const [images, setImages] = useState(data.images || []);

  const handleAddImage = () => {
    const link = prompt("Enter image URL:");
    if (!link) return;

    const caption = prompt("Enter caption for the image:");
    const newImage = { link, caption: caption || "No Caption" };
    const updatedImages = [...images, newImage];
    setImages(updatedImages);

    if (onChange) {
      onChange(updatedImages); // Pass updated images to parent if needed
    }
  };

  return (
    <div className="carousel-node border-2 shadow-lg bg-white rounded-lg max-w-[400px] min-w-[240px] break-words">
      <div className="block-title bg-[#ea8080] px-5 py-2 rounded-t-lg">
        <p className="font-semibold text-white text-center text-lg">Carousel</p>
      </div>
      <div className="carousel-content px-5 py-3 space-y-4">
        {images.length > 0 ? (
          images.map((image, index) => (
            <div key={index} className="carousel-item bg-gray-100 text-gray-700 p-3 rounded-md shadow-sm space-y-2">
              <img
                src={image.link}
                alt={`Carousel Item ${index + 1}`}
                className="w-full h-[150px] object-cover rounded-md"
              />
              <p className="text-sm">{image.caption}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No images added.</p>
        )}
      </div>
      <button
        className="add-image-btn mt-2 px-3 py-2 bg-[#ea8080] text-white rounded-md mb-4 mx-auto block"
        onClick={handleAddImage}
      >
        Add Image
      </button>

      <CustomHandle type="target" position={Position.Left} className="custom-handle" />
      <CustomHandle type="source" position={Position.Right} className="custom-handle" />
    </div>
  );
}
