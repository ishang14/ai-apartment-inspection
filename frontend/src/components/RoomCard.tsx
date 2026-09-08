import InspectionImage, {
  UploadImage,
} from "./InspectionImage";

import type { Room } from "../types/inspection";


interface RoomCardProps {
  room: Room;
  onUploaded: () => void;
}


function RoomCard({
  room,
  onUploaded,
}: RoomCardProps) {

  return (
    <article className="border-t border-stone-300 pt-6">

      {/* Room header */}

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-4">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-900 text-sm font-bold text-white">
            {room.name.charAt(0).toUpperCase()}
          </div>


          <div>

            <h3 className="text-lg font-bold text-stone-900">
              {room.name}
            </h3>

            <p className="mt-0.5 text-xs text-stone-500">
              {room.images.length}{" "}
              {room.images.length === 1
                ? "photo"
                : "photos"}{" "}
              analyzed
            </p>

          </div>

        </div>


        <UploadImage
          roomId={room.id}
          onUploaded={onUploaded}
        />

      </div>


      {/* Images */}

      {room.images.length === 0 ? (

        <div className="rounded-xl border border-dashed border-stone-300 bg-white p-10 text-center">

          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-stone-500">
            +
          </div>


          <p className="text-sm font-medium text-stone-600">
            No inspection photos
          </p>


          <p className="mt-1 text-xs text-stone-400">
            Upload photos of this room to begin AI analysis.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

          {room.images.map(
            (image, index) => (

              <div
                key={image.id}
                className="
                  group
                  overflow-hidden
                  rounded-xl
                  border
                  border-stone-200
                  bg-white
                  shadow-sm
                  transition
                  hover:-translate-y-0.5
                  hover:shadow-md
                "
              >

                {/* Photo */}

                <div className="relative overflow-hidden bg-stone-100">

                  <InspectionImage
                    image={image}
                    roomName={room.name}
                  />


                  {/* Photo number */}

                  <span className="absolute left-3 top-3 rounded-full bg-stone-900/80 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
                    PHOTO {index + 1}
                  </span>

                </div>

              </div>

            )
          )}

        </div>

      )}

    </article>
  );
}


export default RoomCard;