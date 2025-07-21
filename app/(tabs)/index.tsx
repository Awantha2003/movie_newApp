import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Link } from "expo-router";
import { ScrollView, Image, ActivityIndicator, FlatList } from "react-native";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";
// import fetchMovies from "@/services/api";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import MovieCard from "../MovieCard";

export default function Index() {
  const router = useRouter();

const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ 
    
    query: "" }));

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: '100%',
          paddingBottom: 10,
        }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mx-auto" />

        {moviesLoading ? (
          <ActivityIndicator size="large" color="#ab8bff" className="mt-10 self-center" />
        ) : moviesError ? (
          <Text className="text-red-500 text-center mt-10">{moviesError?.message ?? String(moviesError)}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              value=""
              onChangeText={() => {}}
              onPress={() => router.push('/search')}
              placeholder="Search for  a movie "
            />
            <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>

            <FlatList
            data={movies}
            renderItem={({ item }) => (
                <MovieCard 
                
                {...item}

                />
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{ 
              justifyContent: 'flex-start',
              gap: 20,
              marginBottom: 20
            }}

            className="mt-2  pb-32"
            scrollEnabled={false}
            
            />


          </View>
        )}
      </ScrollView>
    </View>
  );
}
