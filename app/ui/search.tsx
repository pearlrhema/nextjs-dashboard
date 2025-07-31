"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDebouncedCallback } from "use-debounce";

//update the url with the search params
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  //inside the search component...
  const handleSearch = useDebouncedCallback((term: string) => {
    console.log(`Searching... ${term}`);
    //create a new URLSearchParams object from the current searchParams
    //this allows us to manipulate the search params easily
    //if the user types in the search input, we want to update the URL with the new search term
    //if the input is empty, we want to remove the query param from
    const params = new URLSearchParams(searchParams);
    //set the params string based on the user's input. if the input is empty, delete the param
    //reset the page numbber to 1
    params.set("page", "1");
    //if the term is not empty, set the query param to the term
    //if the term is empty, delete the query param
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
      // console.log(term);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 3000);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
