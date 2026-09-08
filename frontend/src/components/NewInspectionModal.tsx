import {
  useState,
} from "react";

import type {
  FormEvent,
} from "react";

import type {
  InspectionType,
} from "../types/inspection";


interface NewInspectionModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (
    propertyName: string,
    inspectionType: InspectionType
  ) => void;
}


function NewInspectionModal({
  open,
  onClose,
  onCreate,
}: NewInspectionModalProps) {

  const [
    propertyName,
    setPropertyName,
  ] = useState("");


  const [
    inspectionType,
    setInspectionType,
  ] = useState<InspectionType>(
    "move_in"
  );


  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {

    event.preventDefault();


    if (!propertyName.trim()) {

      return;

    }


    onCreate(
      propertyName.trim(),
      inspectionType
    );

  }


  /*
   * Do not render anything when the modal
   * is not supposed to be open.
   */

  if (!open) {

    return null;

  }


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/40 px-4 backdrop-blur-sm">

      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 shadow-2xl">

        {/* Header */}

        <div className="border-b border-stone-200 px-6 py-5">

          <div className="flex items-start justify-between gap-4">

            <div>

              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-orange-700 text-sm font-bold text-white">
                +
              </div>


              <h2 className="text-xl font-bold tracking-tight text-stone-900">
                New Inspection
              </h2>


              <p className="mt-1 text-sm text-stone-500">
                Start a new property assessment.
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

          {/* Property name */}

          <div>

            <label
              htmlFor="property-name"
              className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-500"
            >
              Property name
            </label>


            <input
              id="property-name"
              type="text"
              autoFocus
              value={propertyName}
              onChange={(event) =>
                setPropertyName(
                  event.target.value
                )
              }
              placeholder="e.g. Apartment 204"
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


          {/* Inspection type */}

          <div>

            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-500">
              Inspection type
            </label>


            <div className="grid grid-cols-2 gap-3">

              {/* Move-in */}

              <button
                type="button"
                onClick={() =>
                  setInspectionType(
                    "move_in"
                  )
                }
                className={`
                  rounded-xl
                  border
                  px-4
                  py-3
                  text-left
                  transition
                  ${
                    inspectionType ===
                    "move_in"
                      ? "border-orange-600 bg-orange-50 text-orange-800"
                      : "border-stone-300 bg-white text-stone-600 hover:border-stone-400"
                  }
                `}
              >

                <p className="text-sm font-bold">
                  Move-in
                </p>

                <p className="mt-0.5 text-xs opacity-70">
                  Document initial condition
                </p>

              </button>


              {/* Move-out */}

              <button
                type="button"
                onClick={() =>
                  setInspectionType(
                    "move_out"
                  )
                }
                className={`
                  rounded-xl
                  border
                  px-4
                  py-3
                  text-left
                  transition
                  ${
                    inspectionType ===
                    "move_out"
                      ? "border-orange-600 bg-orange-50 text-orange-800"
                      : "border-stone-300 bg-white text-stone-600 hover:border-stone-400"
                  }
                `}
              >

                <p className="text-sm font-bold">
                  Move-out
                </p>

                <p className="mt-0.5 text-xs opacity-70">
                  Assess final condition
                </p>

              </button>

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
              disabled={!propertyName.trim()}
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
              Create Inspection
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}


export default NewInspectionModal;