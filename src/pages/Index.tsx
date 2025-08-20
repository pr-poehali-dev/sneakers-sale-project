import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  images: string[];
  sizes: number[];
  colors: string[];
  isOnSale?: boolean;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number[]>([0, 50000]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<{[key: number]: number}>({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const products: Product[] = [
    {
      id: 1,
      name: "Air Jordan 1 Retro High",
      brand: "Nike",
      price: 12990,
      originalPrice: 15990,
      images: [
        "/img/f372e524-2b83-4971-ad6a-5fe58e17ff68.jpg",
        "/img/df6b654c-0e0d-45d7-9ce7-b9d388acd3ef.jpg",
        "/img/f3df2aeb-47e3-412e-9ce7-d0417bc3efb7.jpg"
      ],
      sizes: [40, 41, 42, 43, 44, 45],
      colors: ["Черный", "Белый", "Красный"],
      isOnSale: true
    },
    {
      id: 2,
      name: "Stan Smith",
      brand: "Adidas",
      price: 8990,
      images: [
        "/img/fc3356c3-3c7d-46a6-8549-85c0fec33be6.jpg",
        "/img/f372e524-2b83-4971-ad6a-5fe58e17ff68.jpg"
      ],
      sizes: [39, 40, 41, 42, 43, 44],
      colors: ["Белый", "Зеленый"]
    },
    {
      id: 3,
      name: "Air Force 1",
      brand: "Nike",
      price: 9990,
      originalPrice: 11990,
      images: [
        "/img/f372e524-2b83-4971-ad6a-5fe58e17ff68.jpg",
        "/img/fc3356c3-3c7d-46a6-8549-85c0fec33be6.jpg"
      ],
      sizes: [40, 41, 42, 43, 44, 45, 46],
      colors: ["Белый", "Черный"],
      isOnSale: true
    },
    {
      id: 4,
      name: "RS-X",
      brand: "Puma",
      price: 7490,
      images: [
        "/img/fc3356c3-3c7d-46a6-8549-85c0fec33be6.jpg",
        "/img/f372e524-2b83-4971-ad6a-5fe58e17ff68.jpg"
      ],
      sizes: [39, 40, 41, 42, 43, 44],
      colors: ["Серый", "Синий", "Белый"]
    },
    {
      id: 5,
      name: "574 Core",
      brand: "New Balance",
      price: 6990,
      images: [
        "/img/fc3356c3-3c7d-46a6-8549-85c0fec33be6.jpg",
        "/img/f372e524-2b83-4971-ad6a-5fe58e17ff68.jpg"
      ],
      sizes: [40, 41, 42, 43, 44],
      colors: ["Серый", "Синий"]
    },
    {
      id: 6,
      name: "Dunk Low",
      brand: "Nike",
      price: 11990,
      images: [
        "/img/f372e524-2b83-4971-ad6a-5fe58e17ff68.jpg",
        "/img/fc3356c3-3c7d-46a6-8549-85c0fec33be6.jpg"
      ],
      sizes: [39, 40, 41, 42, 43, 44, 45],
      colors: ["Белый", "Черный", "Серый"]
    },
    {
      id: 7,
      name: "Soft 7",
      brand: "Ecco",
      price: 13990,
      images: [
        "/img/fc3356c3-3c7d-46a6-8549-85c0fec33be6.jpg",
        "/img/f372e524-2b83-4971-ad6a-5fe58e17ff68.jpg"
      ],
      sizes: [40, 41, 42, 43, 44, 45],
      colors: ["Коричневый", "Черный"]
    },
    {
      id: 8,
      name: "Classic Mini",
      brand: "UGG",
      price: 16990,
      originalPrice: 19990,
      images: [
        "/img/fc3356c3-3c7d-46a6-8549-85c0fec33be6.jpg",
        "/img/f372e524-2b83-4971-ad6a-5fe58e17ff68.jpg"
      ],
      sizes: [36, 37, 38, 39, 40, 41],
      colors: ["Бежевый", "Черный", "Серый"],
      isOnSale: true
    }
  ];

  const brands = ["all", "Nike", "Adidas", "Puma", "New Balance", "Ecco", "UGG"];
  const sizes = ["all", ...Array.from(new Set(products.flatMap(p => p.sizes))).sort((a, b) => a - b)];
  const colors = ["all", ...Array.from(new Set(products.flatMap(p => p.colors)))];

  const filteredProducts = products.filter(product => {
    return (
      (selectedBrand === 'all' || product.brand === selectedBrand) &&
      (selectedSize === 'all' || product.sizes.includes(Number(selectedSize))) &&
      (selectedColor === 'all' || product.colors.includes(selectedColor)) &&
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
  });

  const addToCart = (product: Product) => {
    setCartItems(prev => [...prev, product]);
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter((_, index) => index !== productId));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'sneakers2024') {
      setIsAuthenticated(true);
      setPasswordError('');
    } else {
      setPasswordError('Неверный пароль');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">KICKS VAULT</h1>
            <p className="text-gray-600">Премиальный магазин кроссовок</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Пароль для входа
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Введите пароль"
                required
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>
            
            <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
              Войти в магазин
            </Button>
            
            <div className="text-center text-sm text-gray-500">
              Пароль: <span className="font-mono bg-gray-100 px-2 py-1 rounded">sneakers2024</span>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-black">KICKS VAULT</h1>
              <nav className="hidden md:flex space-x-6">
                <a href="#catalog" className="text-gray-700 hover:text-black transition-colors">Каталог</a>
                <a href="#brands" className="text-gray-700 hover:text-black transition-colors">Бренды</a>
                <a href="#sale" className="text-gray-700 hover:text-black transition-colors">Распродажа</a>
                <a href="#delivery" className="text-gray-700 hover:text-black transition-colors">Доставка</a>
                <a href="#contacts" className="text-gray-700 hover:text-black transition-colors">Контакты</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative"
              >
                <Icon name="ShoppingCart" size={20} />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-accent text-white min-w-[20px] h-5 flex items-center justify-center text-xs">
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-5xl font-bold text-black leading-tight">
                Премиальные<br />
                <span className="text-accent">кроссовки</span><br />
                для вас
              </h2>
              <p className="text-xl text-gray-600">
                Эксклюзивная коллекция от ведущих мировых брендов. Nike, Adidas, Puma, New Balance и другие.
              </p>
              <Button size="lg" className="bg-black text-white hover:bg-gray-800">
                Перейти к покупкам
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </div>
            <div className="relative">
              <img 
                src="/img/f372e524-2b83-4971-ad6a-5fe58e17ff68.jpg" 
                alt="Premium Sneakers" 
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white py-8 border-b border-gray-200" id="catalog">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Бренд</label>
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите бренд" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map(brand => (
                    <SelectItem key={brand} value={brand}>
                      {brand === 'all' ? 'Все бренды' : brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Размер</label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите размер" />
                </SelectTrigger>
                <SelectContent>
                  {sizes.map(size => (
                    <SelectItem key={size} value={size.toString()}>
                      {size === 'all' ? 'Все размеры' : size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Цвет</label>
              <Select value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите цвет" />
                </SelectTrigger>
                <SelectContent>
                  {colors.map(color => (
                    <SelectItem key={color} value={color}>
                      {color === 'all' ? 'Все цвета' : color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Цена: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} ₽
              </label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={25000}
                min={0}
                step={500}
                className="mt-2"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-black mb-2">Каталог товаров</h3>
            <p className="text-gray-600">Найдено {filteredProducts.length} товаров</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={product.images[currentImageIndex[product.id] || 0]} 
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                      onClick={() => {
                        const nextIndex = ((currentImageIndex[product.id] || 0) + 1) % product.images.length;
                        setCurrentImageIndex(prev => ({ ...prev, [product.id]: nextIndex }));
                      }}
                    />
                    {product.images.length > 1 && (
                      <div className="absolute bottom-3 left-3 flex space-x-1">
                        {product.images.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full ${
                              index === (currentImageIndex[product.id] || 0) 
                                ? 'bg-white' 
                                : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                    {product.isOnSale && (
                      <Badge className="absolute top-3 left-3 bg-accent text-white">
                        SALE
                      </Badge>
                    )}
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">{product.brand}</p>
                      <h4 className="font-semibold text-black">{product.name}</h4>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-black">
                        {product.price.toLocaleString()} ₽
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          {product.originalPrice.toLocaleString()} ₽
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {product.colors.slice(0, 3).map(color => (
                        <Badge key={color} variant="outline" className="text-xs">
                          {color}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button 
                      className="w-full bg-black text-white hover:bg-gray-800"
                      onClick={() => addToCart(product)}
                    >
                      Добавить в корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-semibold">Корзина ({cartItems.length})</h3>
                <Button variant="ghost" size="sm" onClick={() => setIsCartOpen(false)}>
                  <Icon name="X" size={20} />
                </Button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                {cartItems.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Корзина пуста</p>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-sm text-gray-500">{item.brand}</p>
                          <p className="font-semibold">{item.price.toLocaleString()} ₽</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeFromCart(index)}
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {cartItems.length > 0 && (
                <div className="border-t p-4 space-y-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Итого:</span>
                    <span>{getTotalPrice().toLocaleString()} ₽</span>
                  </div>
                  <Button className="w-full bg-accent text-white hover:bg-orange-600">
                    Оформить заказ
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">KICKS VAULT</h4>
              <p className="text-gray-400">Премиальные кроссовки от ведущих мировых брендов</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Каталог</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Nike</li>
                <li>Adidas</li>
                <li>Puma</li>
                <li>New Balance</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Информация</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Доставка и оплата</li>
                <li>Возврат товара</li>
                <li>Размерная сетка</li>
                <li>Контакты</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Контакты</h5>
              <div className="space-y-2 text-gray-400">
                <p>+7 (999) 123-45-67</p>
                <p>info@kicksvault.ru</p>
                <p>Москва, ул. Примерная, 123</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;