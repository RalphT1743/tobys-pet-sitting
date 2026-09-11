import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import GalleryReveal from "./GalleryReveal";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type DogPhoto = {
  _id: string;
  name?: string;
  caption?: string;
  displayOrder?: number;
  image: any;
};

async function getDogPhotos(): Promise<DogPhoto[]> {
  return client.fetch(`
    *[_type == "dogPhoto" && defined(image)] | order(displayOrder asc) {
      _id,
      name,
      caption,
      displayOrder,
      image
    }
  `);
}

export default async function PhotosPage() {
  const photos = await getDogPhotos();

  return (
    <main className="dog-gallery-page">

      {/* BROWN HERO */}
      <section className="dog-gallery-hero">
        <div className="dog-gallery-hero-inner">
          <div>
            <p className="dog-gallery-kicker">OUR GALLERY</p>

            <h1>
              The dogs we&apos;ve
              <br />
              cared for
            </h1>
          </div>

          <div className="dog-gallery-hero-copy">
            <p>
              Every dog gets personal, attentive care — and plenty of
              opportunities to feel right at home.
            </p>

            <Link href="/" className="dog-gallery-back">
              ← Back home
            </Link>
          </div>
        </div>

        <div className="dog-gallery-meta">
          <span>A FEW OF OUR FRIENDS</span>
          <span>{photos.length} PHOTOS</span>
        </div>
      </section>

      {/* GALLERY */}
      <section className="dog-gallery-section">
        <div className="dog-gallery-grid">
          {photos.map((photo) => (
            <article className="dog-gallery-card" key={photo._id}>
              <Image
                src={urlFor(photo.image)
                  .width(1400)
                  .height(1600)
                  .fit("crop")
                  .url()}
                alt={
                  photo.name ||
                  photo.caption ||
                  "Dog cared for by Toby's Pet Sitting"
                }
                fill
                sizes="(max-width: 650px) 100vw, (max-width: 950px) 50vw, 33vw"
                className="dog-gallery-image"
              />

              {(photo.name || photo.caption) && (
                <div className="dog-gallery-info">
                  {photo.name && <h2>{photo.name}</h2>}
                  {photo.caption && <p>{photo.caption}</p>}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="dog-gallery-cta">
        <div>
          <p className="dog-gallery-kicker">PERSONAL CARE</p>
          <h2>Every dog is treated like family.</h2>
        </div>

        <Link href="/#contact" className="dog-gallery-cta-button">
          Get in touch →
        </Link>
      </section>

      <GalleryReveal />
    </main>
  );
}