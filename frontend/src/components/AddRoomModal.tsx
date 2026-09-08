import {
  useState,
} from "react";

import type {
  FormEvent,
} from "react";


interface AddRoomModalProps {
  onClose: () => void;
  onCreate: (roomName: string) => void;
}


function AddRoomModal({
  onClose,
  onCreate,
}: AddRoomModalProps) {

  const [roomName, setRoomName] =
    useState("");


  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {

    event.preventDefault();

    if (!roomName.trim()) {
      return;
    }

    onCreate(
      roomName.trim()
    );
  }


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/40 px-4 backdrop-blur-sm">

      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 shadow-2xl">

        {/* Header */}

        <div className="border-b border-stone-200 px-6 py-5">

          <div className="flex items-start justify-between gap-4">

            <div>

              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-stone-900 text-sm font-bold text-white">
                +
              </div>


              <h2 className="text-xl font-bold tracking-tight text-stone-900">
                Add Room
              </h2>


              <p className="mt-1 text-sm text-stone-500">
                Add an inspection area to this property.
              </p>

            </div>


            <button
              type="button"
              onClick={onClose}
              className="
                rounded-lg
                px-2
                py-1
                text-xl
                leading-none
                text-stone-400
                transition
                hover:bg-stone-200
                hover:text-stone-700
              "
            >
              ×
            </button>

          </div>

        </div>


        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 px-6 py-6"
        >

          <div>

            <label
              htmlFor="room-name"
              className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-500"
            >
              Room name
            </label>


            <input
              id="room-name"
              type="text"
              autoFocus
              value={roomName}
              onChange={(event) =>
                setRoomName(
                  event.target.value
                )
              }
              placeholder="e.g. Living Room"
              className="
                w-full
                rounded-xl
                border
                border-stone-300
                bg-white
                px-4
                py-3
                text-sm
                text-stone-900
                outline-none
                placeholder:text-stone-400
                transition
                focus:border-orange-600
                focus:ring-2
                focus:ring-orange-600/10
              "
            />

          </div>


          {/* Suggested rooms */}

          <div>

            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-stone-400">
              Common areas
            </p>


            <div className="flex flex-wrap gap-2">

              {[
                "Living Room",
                "Bedroom",
                "Kitchen",
                "Bathroom",
                "Hallway",
              ].map((name) => (

                <button
                  key={name}
                  type="button"
                  onClick={() =>
                    setRoomName(name)
                  }
                  className="
                    rounded-full
                    border
                    border-stone-200
                    bg-white
                    px-3
                    py-1.5
                    text-xs
                    font-medium
                    text-stone-600
                    transition
                    hover:border-stone-300
                    hover:bg-stone-100
                    hover:text-stone-900
                  "
                >
                  {name}
                </button>

              ))}

            </div>

          </div>


          {/* Actions */}

          <div className="flex justify-end gap-3 border-t border-stone-200 pt-5">

            <button
              type="button"
              onClick={onClose}
              className="
                rounded-xl
                px-4
                py-2.5
                text-sm
                font-semibold
                text-stone-600
                transition
                hover:bg-stone-200
                hover:text-stone-900
              "
            >
              Cancel
            </button>


            <button
              type="submit"
              disabled={!roomName.trim()}
              className="
                rounded-xl
                bg-orange-700
                px-5
                py-2.5
                text-sm
                font-bold
                text-white
                shadow-sm
                transition
                hover:bg-orange-800
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              Add Room
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}


export default AddRoomModal;