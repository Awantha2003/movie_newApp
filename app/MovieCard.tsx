import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
import { icons } from '@/constants/icons';

const MovieCard = ({id, title, poster_path ,vote_average, release_date}:Movie) => {

    console.log(poster_path);

  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : 'https://placeholder.co/600x400/1a1a1a/ffffff.png'
          }}

          className="w-full h-52 rounded-lg"
            resizeMode="cover"
        />
        <Text className="text-white text-sm mt-2 font-bold  numberOfLines={1}" >{title}</Text>

        <View className='flex-row items-center justify-start gap-x-1'>

            <Image source={icons.star} className='size-4' />
            <Text className='text-xs text-white font-bold uppercase'>{Math.round(vote_average /2)}</Text>
            
        </View>

        <View className='flex-row items-center justify-between'>

            <Text className="text-xs text-light-300">{release_date?.split('-')[0]}</Text>

        </View>

        {/*<Text className='text-xs font-medium  text-light-300 uppercase'>Movie</Text>*/}

      </TouchableOpacity>
    </Link>
  );
}

export default MovieCard