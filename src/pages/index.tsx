/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { TextInput, Button, Box, LoadingOverlay } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Songs } from "@components/layout/Songs";
import { useLocale } from "@hooks/useLocale";
import { result } from "@type/typeResult";
import useSWR from "swr";

// const fetcher = async (input: RequestInfo, init: RequestInit) => {
//   const res = await fetch(input, init);
//   return res.json();
// };

// const useFetch = (
//   values: { music: string },
//   lang: "ja_jp" | "en_us",
//   country: "jp" | "us"
// ) => {
//   const { data, error } = useSWR(
//     `//itunes.apple.com/search?term=${values.music}&country=${country}&lang=${lang}&media=music&limit=51&offset=0`,
//     fetcher
//   );
//   return {
//     data,
//     error,
//   };
// };

const LIMIT = 21;
const Home: NextPage = () => {
  const [loadingFlag, setLoadingFlag] = useState<boolean>(false);
  const [songsData, setSongsData] = useState<result>();
  //-------------------------------
  const [music, setMusic] = useState<string>("");
  const [lang, setLang] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [num, setNum] = useState<number>(0);
  //-------------------------------
  const router = useRouter();

  let API_lang: "ja_jp" | "en_us" = "en_us";
  let API_country: "jp" | "us" = "us";
  if (router.locale === "ja") {
    API_lang = "ja_jp";
    API_country = "jp";
  }

  const { t } = useLocale();

  const form = useForm({
    initialValues: {
      music: "",
    },
  });

  const handleSubmit = useCallback(
    async (
      values: { music: string },
      lang: "ja_jp" | "en_us",
      country: "jp" | "us"
    ) => {
      setLoadingFlag(true);

      setMusic(values.music);
      setLang(lang);
      setCountry(country);

      const { data } = await axios.get(
        `//itunes.apple.com/search?term=${values.music}&country=${country}&lang=${lang}&media=music&limit=${LIMIT}&offset=0`
      );

      setSongsData(data);
      setLoadingFlag(false);
    },
    []
  );

  const addCard = async (numb: number) => {
    setNum(numb);
    const { data } = await axios.get(
      `//itunes.apple.com/search?term=${music}&country=${country}&lang=${lang}&media=music&limit=12&offset=${
        LIMIT + num
      }`
    );
    console.log(num, [...data.results]);
    console.log(num, data.results);
    console.log("songdata", [...songsData!.results]);
    //console.log("songdata", [...songsData?.results]);
    //setSongsData([...data.results, ...songsData]);
    //setSongsData([...songsData!.results, ...data.results]);
  };

  return (
    <div className="flex flex-col justify-center">
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form
          onSubmit={form.onSubmit((values) =>
            handleSubmit(values, API_lang, API_country)
          )}
          className="mt-2 flex gap-x-2"
        >
          <TextInput placeholder={t.SEARCH} {...form.getInputProps("music")} />
          <Button type="submit" color="cyan">
            <FaSearch />
          </Button>
        </form>
      </Box>
      <LoadingOverlay
        visible={loadingFlag}
        loaderProps={{ size: "lg", color: "cyan", variant: "dots" }}
        overlayOpacity={0.3}
      />
      <div className="mt-5">
        <Songs songsData={songsData!} loading={loadingFlag} />
        <Button color="cyan" className="m-5" onClick={() => addCard(10)}>
          show more
        </Button>
      </div>
    </div>
  );
};

export default Home;
