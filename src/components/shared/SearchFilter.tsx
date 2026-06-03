"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useState, useEffect, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchFilterProps {
  placeholder?: string;
  paramName?: string;
}

const SearchFilter = ({
  placeholder = "searching ...",
  paramName = "searchTerm",
}: SearchFilterProps) => {
  const searchparams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(searchparams.get(paramName) || "");
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchparams.toString());
    const initialValue = searchparams.get(paramName) || "";

    if (debouncedValue === initialValue) {
      return;
    }

    if (debouncedValue) {
      params.set(paramName, debouncedValue);
      params.set("page", "1");
    } else {
      params.delete(paramName);
      params.delete("page");
    }

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  }, [debouncedValue, paramName, router, searchparams]);
  return (
    <div className="relative">
      <Search className=" absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        className="pl-10"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={isPending}
      />
    </div>
  );
};

export default SearchFilter;
