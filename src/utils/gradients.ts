export const getGradientBg = () : string =>  {
  const gradients = [
    'bg-gradient-to-r from-purple-500 to-pink-500',
    'bg-gradient-to-r from-indigo-500 to-blue-500',
    'bg-gradient-to-r from-teal-400 to-lime-400',
    'bg-gradient-to-r from-rose-400 to-orange-300',
    'bg-gradient-to-r from-cyan-500 to-blue-500',
    'bg-gradient-to-r from-amber-400 to-yellow-500',
    'bg-gradient-to-br from-green-400 to-emerald-600',
    'bg-gradient-to-tr from-fuchsia-500 to-rose-500',
  ];

  const randomIndex = Math.floor(Math.random() * gradients.length);
  return gradients[randomIndex];
}