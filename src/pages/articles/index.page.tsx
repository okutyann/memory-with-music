import React from "react";
import { MemoryCard, SkeletonCard } from "@components/Memory/MemoryCard";
import { Grid, LoadingOverlay } from "@mantine/core";
import { useGetAllSongs } from "@hooks/useGetAllSongs";
import { CustomNextPage } from "next";
import { DashboardLayout } from "@pages/Layout";

const NUMBER_OF_SKELETONS = Array.from(Array(20).keys());

const Articles: CustomNextPage = () => {
  const { songList, isLoading } = useGetAllSongs();

  return (
    <div>
      <div>
        <Grid>
          {isLoading &&
            NUMBER_OF_SKELETONS.map((item) => {
              return (
                <Grid.Col xs={6} sm={4} className="mx-1 sm:mx-0" key={item}>
                  <div className="px-1 sm:mx-0">
                    <SkeletonCard />
                  </div>
                </Grid.Col>
              );
            })}

          {songList.map((item) => {
            return (
              <Grid.Col xs={6} key={item.id}>
                <div className="m-auto px-2">
                  <MemoryCard
                    id={item.id}
                    song={item.song}
                    image={item?.image}
                    artist={item.artist}
                    memory={item.memory}
                  />
                </div>
              </Grid.Col>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

Articles.getLayout = DashboardLayout;
export default Articles;
