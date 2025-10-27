# 🎨 Custom SVG Icon System

## Overview
Custom SVG icon library designed specifically for the Learn2Launch (L2L) platform, replacing all `lucide-react` dependencies. All icons are built with the **Maple Finance Design System** color palette in mind.

## Features
- ✅ **SVG-based** - No external dependencies
- ✅ **Type-safe** - Full TypeScript support
- ✅ **Customizable** - Supports all SVG props (color, size, style, className, etc.)
- ✅ **Themeable** - Adapts to Maple color system
- ✅ **Lightweight** - Tree-shakeable exports
- ✅ **Consistent** - 2px stroke width, rounded line caps

## Usage

### Basic Import
```tsx
import { BookOpen, Trophy, Code } from '@/components/icons';

// Use like any component
<BookOpen className="w-6 h-6 text-maple-coral-500" />
```

### With Props
```tsx
<Shield 
  size={32}
  color="#FF7A5C"
  strokeWidth={2.5}
  className="hover:scale-110 transition-transform"
/>
```

### With Inline Styles
```tsx
<TrendingUp 
  style={{ color: '#00E0FF' }}
  className="w-8 h-8"
/>
```

### As Dynamic Components
```tsx
const Icon = features.map(f => f.icon); // Component reference
<Icon className="w-6 h-6 text-maple-coral-600" />
```

## Icon Categories

### Navigation Icons (`navigation-icons.tsx`)
- `ChevronDown`, `ChevronUp`, `ChevronRight`, `ChevronLeft`
- `ArrowRight`, `ArrowLeft`, `ArrowUp`, `ArrowDown`, `ArrowUpRight`
- `Home`

### Action Icons (`action-icons.tsx`)
- `BookOpen`, `Book`, `Search`, `Plus`, `Copy`, `Trash2`
- `Download`, `Play`, `Filter`, `Eye`, `EyeOff`
- `Settings`, `LogOut`

### Status Icons (`status-icons.tsx`)
- `Trophy`, `Award`, `Star`, `CheckCircle`, `Check`, `X`
- `AlertTriangle`, `AlertCircle`, `Info`
- `Lock`, `Unlock`, `Bell`

### Business Icons (`business-icons.tsx`)
- `Code`, `Code2`, `Shield`, `Target`, `Zap`, `Rocket`
- `TrendingUp`, `TrendingDown`, `BarChart`, `BarChart2`, `BarChart3`
- `Wallet`, `DollarSign`, `CreditCard`, `Calendar`, `Clock`
- `PieChart`, `Building2`

### User & Social Icons (`user-social-icons.tsx`)
- `Users`, `User`, `UserPlus`, `Handshake`
- `MessageCircle`, `MessageSquare`, `Mail`, `Send`, `Share2`
- `Twitter`, `Linkedin`, `Github`

### Tech Icons (`tech-icons.tsx`)
- `Terminal`, `Database`, `Server`, `GitBranch`, `Activity`
- `Sparkles`, `Key`, `Hash`, `Layers`, `Box`, `Package`, `Cpu`

### Layout Icons (`layout-icons.tsx`)
- `LayoutDashboard`, `Grid`, `Menu`, `Globe`, `Lightbulb`
- `Image`, `FileText`, `File`, `Folder`, `Briefcase`
- `Heart`, `ExternalLink`, `Link`

## Maple Color System Integration

### Using Maple Colors
```tsx
// With Tailwind classes
<Code className="text-maple-coral-500" />
<Shield className="text-maple-dark-900" />

// With inline color prop
<Trophy color="#FF7A5C" /> {/* maple-coral-500 */}
<Zap color="#00E0FF" />   {/* Custom cyan */}
```

### Recommended Color Patterns

#### Primary Actions (Coral)
```tsx
<Rocket className="text-maple-coral-500" />
<ChevronRight className="text-maple-coral-600" />
```

#### Success States (Green)
```tsx
<CheckCircle className="text-green-500" />
<Trophy className="text-green-600" />
```

#### Neutral/Secondary (Gray)
```tsx
<Users className="text-maple-gray-400" />
<Settings className="text-maple-gray-500" />
```

#### Dark Theme
```tsx
<Shield className="text-white" />
<Lock className="text-maple-gray-300" />
```

## API Reference

### IconProps Interface
```typescript
interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;       // Width & height (default: 24)
  color?: string;                // Stroke color (default: 'currentColor')
  strokeWidth?: number;          // Line thickness (default: 2)
  className?: string;            // Tailwind/CSS classes
  style?: React.CSSProperties;  // Inline styles
  // ... all standard SVG props
}
```

## Adding New Icons

### 1. Choose the appropriate category file
```tsx
// Example: Adding a new business icon to business-icons.tsx
export const MyNewIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path d="..." />
    <circle cx="12" cy="12" r="4" />
  </BaseIcon>
);
```

### 2. Export from index.tsx
```tsx
export { MyNewIcon } from './business-icons';
```

### 3. Use it
```tsx
import { MyNewIcon } from '@/components/icons';
```

## Migration from lucide-react

### Before
```tsx
import { BookOpen } from 'lucide-react';
<BookOpen className="w-6 h-6" />
```

### After
```tsx
import { BookOpen } from '@/components/icons';
<BookOpen className="w-6 h-6" />
```

**✨ Same API, same usage pattern - just better performance and customization!**

## Performance Benefits
- **No external dependencies**: Reduces bundle size
- **Tree-shakeable**: Only imports icons you use
- **SVG-based**: Scales perfectly at any resolution
- **CSS-friendly**: Easy to animate and style

## Design Guidelines
- Use `size={24}` for standard icons
- Use `size={20}` for compact UIs
- Use `size={32}` for hero sections
- Maintain 2px stroke width for consistency
- Use `currentColor` to inherit parent text color

## Examples

### Button with Icon
```tsx
<button className="flex items-center gap-2 text-maple-coral-500">
  <Rocket className="w-5 h-5" />
  <span>Launch</span>
</button>
```

### Animated Icon
```tsx
<motion.div whileHover={{ scale: 1.1 }}>
  <Star className="w-8 h-8 text-yellow-500" />
</motion.div>
```

### Icon with Gradient
```tsx
<div className="bg-gradient-to-r from-maple-coral-500 to-maple-coral-700 p-3 rounded-xl">
  <Trophy className="w-6 h-6 text-white" />
</div>
```

## Support
For issues or new icon requests, contact the development team or open an issue in the repository.

---
**Built with ❤️ for Learn2Launch**
