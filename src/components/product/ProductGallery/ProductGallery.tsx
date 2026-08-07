import { useEffect, useState } from "react";

import type { Product } from "../../../types";

import "./ProductGallery.css";

interface ProductGalleryProps {
    product: Product;
}

function ProductGallery({
    product,
}: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(
        product.images[0]
    );

    useEffect(() => {
        setSelectedImage(product.images[0]);
    }, [product]);

    return (
        <div className="product-gallery">
            <img
                src={selectedImage.url}
                alt={selectedImage.alt}
                className="product-gallery__main-image"
            />

            <div className="product-gallery__thumbnails">
                {product.images.map((image) => (
                    <img
                        key={image.id}
                        src={image.url}
                        alt={image.alt}
                        className="product-gallery__thumbnail"
                        onClick={() => setSelectedImage(image)}
                    />
                ))}
            </div>
        </div>
    );
}

export default ProductGallery;