import type { Dispatch, FormEvent, SetStateAction } from "react";

import { IoMdClose } from "react-icons/io";

type InputSearchProps = {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
};

const InputSearch = ({ searchValue, setSearchValue }: InputSearchProps) => {
  return (
    <div className="w-full md:max-w-6/12 mx-auto mt-4 mb-6 flex gap-2">
      <input
        type="text"
        placeholder="Digite o nome do produto..."
        className="w-full outline-0 border-1 p-1 border-gray-400 rounded-lg transition-all duration-200 focus:border-primary placeholder:text-gray-400"
        value={searchValue}
        onChange={(ev) => setSearchValue(ev.target.value)}
      />

      {searchValue.length > 0 && (
        <button type="button" className="text-primary cursor-pointer" onClick={() => setSearchValue("")}>
          <IoMdClose size={24} />
        </button>
      )}
    </div>
  );
};

export default InputSearch;
