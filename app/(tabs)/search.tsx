import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants/images'
import MovieCard from '../MovieCard'
import { fetchMovies } from '@/services/api'
import useFetch from '@/services/useFetch'
import { icons } from '@/constants/icons'
import SearchBar from '@/components/SearchBar'

const search = () => {

  const [searchQuery, setSearchQuery] = useState("");

const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({
    query: searchQuery
  }), false)

  useEffect(() => {

    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      }
      else {
        reset();
      }
    },500);

    return () => clearTimeout(timeoutId);

    
  }, [searchQuery])


  return (
    <View className='flex-1 bg-primary'>

  <Image
    source={images.bg}
    style={{
      flex: 1,
      position: 'absolute',
      width: '100%',
      zIndex: 0,
      resizeMode: 'cover'
    }}
  />

      <Image
        source={images.bg}
        style={{
          flex: 1,
          position: 'absolute',
          width: '100%',
          zIndex: 0,
          resizeMode: 'cover'
        }}
      />

     

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className='px-5'
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 16,
          marginVertical: 16,
        }}

        contentContainerStyle={{
          paddingBottom: 100,
          paddingTop: 16,
        }}

        ListHeaderComponent={
          <>
            <View className='w-full flex-row justify-center mt-safe-or-20'>
              <Image source={icons.logo} className='w-12 h-10' />
            </View>

            <View className='my-5'>
              <SearchBar
                placeholder="Search  movies..."
                value={searchQuery}
                onChangeText={(Text: string) => setSearchQuery(Text)}
                onPress={() => {}}
              />
            </View>

            {loading && (
              <ActivityIndicator
                size="large"
                color="#000ff"
                className="mt-3"
              />
            )}

            {error && (
              <Text className="text-red-500 text-center mt-3">
                {error.message}
              </Text>
            )}

            {
               !loading && !console && searchQuery.trim() && (movies?.length ?? 0) > 0 && (
                 <Text className=" text-white font-bold">
                   SEARCH Results for "{searchQuery}"
                   <Text className="text-accent">SEARCH TERM</Text>
                 </Text>
               ) 
            }


          </>
        }

        ListEmptyComponent={
          !loading && !error ? (
            <Text className="text-white text-center mt-3">
              <Text className="text-accent"> {searchQuery.trim() ? 'No results found' : 'Search for movies...'}</Text>
            </Text>
          ) : null
        }
      />

    </View>
  );
}

export default search