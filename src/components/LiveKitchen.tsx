
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Users, Clock, Flame } from 'lucide-react';

const LiveKitchen = () => {
  const [currentChef, setCurrentChef] = useState("Chef Ravi");
  const [currentDish, setCurrentDish] = useState("Chicken Biryani");
  const [viewers, setViewers] = useState(127);
  const [cookingTime, setCookingTime] = useState("45 mins");

  const kitchenScenes = [
    {
      chef: "Chef Ravi",
      dish: "Chicken Biryani",
      action: "Preparing aromatic spice blend",
      time: "45 mins",
      bgColor: "from-orange-400 to-red-500"
    },
    {
      chef: "Chef Priya",
      dish: "Mutton Seekh Kebab",
      action: "Grilling on tandoor",
      time: "25 mins",
      bgColor: "from-red-400 to-pink-500"
    },
    {
      chef: "Chef Kumar",  
      dish: "Fish Curry",
      action: "Adding coconut milk",
      time: "30 mins",
      bgColor: "from-blue-400 to-teal-500"
    },
    {
      chef: "Chef Meera",
      dish: "Paneer Tikka",
      action: "Marinating with yogurt",
      time: "20 mins",  
      bgColor: "from-green-400 to-emerald-500"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomScene = kitchenScenes[Math.floor(Math.random() * kitchenScenes.length)];
      setCurrentChef(randomScene.chef);
      setCurrentDish(randomScene.dish);
      setCookingTime(randomScene.time);
      setViewers(prev => prev + Math.floor(Math.random() * 10) - 5);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Live Video Area */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 aspect-video shadow-2xl">
        {/* Animated background representing kitchen */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/70 via-red-900/60 to-yellow-900/70">
          {/* Animated steam effect */}
          <div className="absolute inset-0 opacity-30">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full animate-pulse"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${60 + Math.sin(i) * 10}%`,
                  width: `${8 + i * 2}px`,
                  height: `${8 + i * 2}px`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${2 + i * 0.3}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Live Badge */}
        <div className="absolute top-4 left-4 z-10">
          <Badge className="bg-red-600 text-white px-3 py-1 text-sm font-bold animate-pulse">
            🔴 LIVE
          </Badge>
        </div>

        {/* Viewer Count */}
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>{viewers} watching</span>
          </div>
        </div>

        {/* Kitchen Scene */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="mb-4">
              <Camera className="h-16 w-16 mx-auto mb-4 text-orange-300 animate-pulse" />
              <h3 className="text-2xl font-bold mb-2">{currentChef}</h3>
              <p className="text-lg text-orange-200">Currently preparing {currentDish}</p>
            </div>
            
            {/* Cooking Animation */}
            <div className="flex items-center justify-center space-x-4 mt-6">
              <Flame className="h-8 w-8 text-red-400 animate-bounce" />
              <div className="text-sm bg-black/30 px-4 py-2 rounded-full">
                <Clock className="inline h-4 w-4 mr-2" />
                {cookingTime} remaining
              </div>
              <Flame className="h-8 w-8 text-orange-400 animate-bounce delay-300" />
            </div>
          </div>
        </div>

        {/* Kitchen Equipment Animation */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex justify-between items-center">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg opacity-60 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
            ))}
          </div>
        </div>
      </div>

      {/* Kitchen Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 hover:shadow-lg transition-all">
          <CardContent className="p-4 text-center">
            <div className="font-bold text-2xl text-orange-600">3</div>
            <div className="text-sm text-gray-600">Active Chefs</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:shadow-lg transition-all">
          <CardContent className="p-4 text-center">
            <div className="font-bold text-2xl text-green-600">12</div>
            <div className="text-sm text-gray-600">Orders Cooking</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 hover:shadow-lg transition-all">
          <CardContent className="p-4 text-center">
            <div className="font-bold text-2xl text-blue-600">{viewers}</div>
            <div className="text-sm text-gray-600">Live Viewers</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:shadow-lg transition-all">
          <CardContent className="p-4 text-center">
            <div className="font-bold text-2xl text-purple-600">4.9★</div>
            <div className="text-sm text-gray-600">Kitchen Rating</div>
          </CardContent>
        </Card>
      </div>

      {/* Behind the Scenes Info */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardContent className="p-6">
          <h3 className="font-bold text-lg mb-3 text-gray-800 flex items-center">
            <Camera className="mr-2 h-5 w-5 text-orange-600" />
            Behind the Scenes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <div className="font-semibold text-gray-700 mb-2">Our Kitchen Promise:</div>
              <ul className="space-y-1">
                <li>• Fresh ingredients sourced daily</li>
                <li>• Traditional cooking methods</li>
                <li>• Hygienic preparation standards</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-gray-700 mb-2">Live Features:</div>
              <ul className="space-y-1">
                <li>• Real-time cooking updates</li>
                <li>• Meet our master chefs</li>
                <li>• Watch your order being prepared</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveKitchen;
