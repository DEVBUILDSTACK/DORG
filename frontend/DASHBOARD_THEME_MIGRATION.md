# Dashboard Theme Migration Guide
## Transform Old Blue Theme (#0A4A7A) to Tangerine Theme (#FF6B35)

---

## 🎨 Color Scheme Reference

### OLD THEME (TO BE REPLACED)
- **Primary Blue**: `#0A4A7A` 
- **Blue Hover**: `#0D5C94`
- **Blue Backgrounds**: `bg-[#0A4A7A]/5`, `bg-[#0A4A7A]/10`, `bg-[#0A4A7A]/20`
- **Blue Borders**: `border-[#0A4A7A]/20`, `border-[#0A4A7A]/30`

### NEW THEME (TARGET)
- **Primary Tangerine**: `#FF6B35`
- **Tangerine Hover**: `#E65A2D`
- **Tangerine Dark**: `#CC5629`
- **Tangerine Backgrounds**: `bg-[#FF6B35]/5`, `bg-[#FF6B35]/10`, `bg-[#FFE8E0]`
- **Tangerine Borders**: `border-[#FF6B35]/20`, `border-[#FF6B35]/30`
- **Secondary Green**: `#2E865F` (keep for success indicators)
- **Background**: `#F5F5F5` or `white`
- **Text Primary**: `#1F2937`
- **Text Secondary**: `#5A6C7D`

---

## 📁 File Structure & Status

### **STUDENT DASHBOARD** (5 files)

#### ✅ Main Pages
1. **`src/app/dashboard/student/page.tsx`** (237 lines)
   - **Lines to Update**: 13, 26, 28, 36, 52, 56, 59, 86 (3x), 134, 140
   - **Elements**: 
     - Heading span: "Welcome back, <span>"
     - Stat cards: Trophy, BookOpen, Vault icons & backgrounds
     - Course cards with progress bars
     - Continue buttons
     - Achievement notifications
   - **Estimated Changes**: ~25 instances

2. **`src/app/dashboard/student/courses/page.tsx`**
   - **Status**: Not yet analyzed
   - **Expected Elements**: Course cards, enrollment buttons, progress tracking

3. **`src/app/dashboard/student/vaults/page.tsx`**
   - **Lines to Update**: 172 (status badge)
   - **Elements**: Vault cards, investment forms, APY displays
   - **Estimated Changes**: ~15 instances

4. **`src/app/dashboard/student/leaderboard/page.tsx`**
   - **Status**: Not yet analyzed
   - **Expected Elements**: Rankings, badges, user profiles

5. **`src/app/dashboard/student/community/page.tsx`**
   - **Status**: Not yet analyzed
   - **Expected Elements**: Discussion threads, interaction buttons

#### ✅ Layout
6. **`src/app/dashboard/student/layout.tsx`**
   - **Elements**: Sidebar navigation, active states, dashboard container background

---

### **DEVELOPER DASHBOARD** (3 files)

#### ✅ Main Pages
7. **`src/app/dashboard/developer/page.tsx`** (218 lines)
   - **Lines to Update**: 13, 19, 27, 36, 55, 59, 76, 89, 132, 147, 149, 150, 155, 203
   - **Elements**:
     - "Command Center" heading span
     - Metric cards: Activity, Database, Server, DollarSign icons
     - API status indicators
     - Performance chart backgrounds
     - Action buttons (Deploy, Test, View Logs)
     - Service health displays
   - **Estimated Changes**: ~35 instances

8. **`src/app/dashboard/developer/contracts/page.tsx`**
   - **Status**: Not yet analyzed
   - **Expected Elements**: Smart contract list, deployment buttons, verification badges

9. **`src/app/dashboard/developer/logs/page.tsx`**
   - **Status**: Not yet analyzed
   - **Expected Elements**: Log viewer, filters, status indicators

#### ✅ Layout
10. **`src/app/dashboard/developer/layout.tsx`**
    - **Elements**: Sidebar, active states, dev tools navigation

---

### **INVESTOR DASHBOARD** (5 files)

#### ✅ Main Pages
11. **`src/app/dashboard/investor/page.tsx`** (267 lines)
    - **Lines to Update**: 13, 21, 30, 40, 62, 66, 70, 78, 87, 116, 119, 142, 170-171, 179 (2x), 194, 205, 208, 222, 254
    - **Elements**:
      - "Portfolio" heading span
      - "Invest in Vault" button (line 21)
      - Metric cards: DollarSign, TrendingUp, Vault, Target icons
      - Chart backgrounds and legends
      - Portfolio allocation pie chart
      - Vault table rows
      - Status badges (line 179)
      - APY displays (line 194)
      - Maturity timeline
      - View details buttons
    - **Estimated Changes**: ~30 instances

12. **`src/app/dashboard/investor/portfolio/page.tsx`**
    - **Status**: Not yet analyzed
    - **Expected Elements**: Detailed portfolio breakdown, asset allocation

13. **`src/app/dashboard/investor/vaults/page.tsx`**
    - **Status**: Not yet analyzed
    - **Expected Elements**: Available vaults, investment interface, performance graphs

14. **`src/app/dashboard/investor/impact/page.tsx`**
    - **Status**: Not yet analyzed
    - **Expected Elements**: Social impact metrics, ESG indicators

15. **`src/app/dashboard/investor/leaderboard/page.tsx`**
    - **Status**: Not yet analyzed
    - **Expected Elements**: Investor rankings, top performers

#### ✅ Settings
16. **`src/app/dashboard/investor/settings/page.tsx`**
    - **Status**: Not yet analyzed
    - **Expected Elements**: Profile settings, preferences, security options

#### ✅ Layout
17. **`src/app/dashboard/investor/layout.tsx`**
    - **Elements**: Sidebar, portfolio summary, quick actions

---

### **SHARED DASHBOARD COMPONENTS**

18. **`src/app/dashboard/layout.tsx`** (Root Layout)
    - **Elements**: Main dashboard wrapper, background color, global navigation
    - **Critical Change**: Background from old theme to `#F5F5F5` or `white`

19. **Potential Shared Components** (to be discovered)
    - Look in `src/components/dashboard/` or similar
    - Chart components
    - Card components
    - Modal/Dialog components
    - Form components

---

## 🔧 Technical Details

### Common Pattern Replacements

#### Text Colors
```tsx
// OLD
className="text-[#0A4A7A]"
// NEW
className="text-[#FF6B35]"
```

#### Background Colors (Light)
```tsx
// OLD
className="bg-[#0A4A7A]/5"
className="bg-[#0A4A7A]/10"
// NEW
className="bg-[#FF6B35]/5"
className="bg-[#FF6B35]/10"
```

#### Button Backgrounds
```tsx
// OLD
className="bg-[#0A4A7A] text-white"
// NEW
className="bg-[#FF6B35] text-white"
```

#### Hover States
```tsx
// OLD
className="hover:bg-[#0D5C94]"
className="hover:text-[#0D5C94]"
// NEW
className="hover:bg-[#E65A2D]"
className="hover:text-[#E65A2D]"
```

#### Border Colors
```tsx
// OLD
className="border-[#0A4A7A]/20"
// NEW
className="border-[#FF6B35]/20"
```

#### Gradients
```tsx
// OLD
className="bg-gradient-to-br from-[#0A4A7A] to-[#2E865F]"
// NEW
className="bg-gradient-to-br from-[#FF6B35] to-[#E65A2D]"
// OR keep green for success indicators
className="bg-gradient-to-br from-[#FF6B35] to-[#2E865F]"
```

---

## 📋 Checklist

### Phase 1: Student Dashboard (Priority: High)
- [ ] Main page (page.tsx)
- [ ] Courses page
- [ ] Vaults page
- [ ] Leaderboard page
- [ ] Community page
- [ ] Layout component

### Phase 2: Developer Dashboard (Priority: High)
- [ ] Main page (page.tsx)
- [ ] Contracts page
- [ ] Logs page
- [ ] Layout component

### Phase 3: Investor Dashboard (Priority: High)
- [ ] Main page (page.tsx)
- [ ] Portfolio page
- [ ] Vaults page
- [ ] Impact page
- [ ] Leaderboard page
- [ ] Settings page
- [ ] Layout component

### Phase 4: Shared Components (Priority: Medium)
- [ ] Root dashboard layout
- [ ] Chart components
- [ ] Card components
- [ ] Modal/Dialog components
- [ ] Form components

### Phase 5: Quality Assurance (Priority: Critical)
- [ ] Add missing `cn()` imports
- [ ] Test responsive layouts (mobile, tablet, desktop)
- [ ] Verify chart data visualization colors
- [ ] Check loading states and spinners
- [ ] Test error message displays
- [ ] Cross-browser testing
- [ ] Accessibility check (color contrast)

---

## 🎯 Quick Reference Commands

### Find all blue color instances in dashboards:
```powershell
# PowerShell
Get-ChildItem -Path "src\app\dashboard" -Filter "*.tsx" -Recurse | Select-String -Pattern "#0A4A7A|#0D5C94" -CaseSensitive
```

### Count instances per file:
```powershell
Get-ChildItem -Path "src\app\dashboard" -Filter "*.tsx" -Recurse | ForEach-Object {
    $count = (Select-String -Path $_.FullName -Pattern "#0A4A7A|#0D5C94" -AllMatches).Matches.Count
    if ($count -gt 0) { "$($_.Name): $count instances" }
}
```

---

## 📊 Statistics

- **Total Files to Update**: ~20 files
- **Estimated Color Replacements**: ~200-250 instances
- **Estimated Time**: 4-6 hours
- **Testing Time**: 2-3 hours

---

## ⚠️ Important Notes

1. **Don't replace Green (#2E865F)**: Keep green for success states and positive metrics
2. **Maintain Contrast**: Ensure text remains readable on backgrounds
3. **Button Patterns**: Use established patterns from landing page:
   - Primary: `bg-[#FF6B35] hover:bg-[#E65A2D]`
   - Secondary: `border-[#FF6B35] text-[#FF6B35] hover:bg-[#FFE8E0]`
4. **Charts**: Update primary series to Tangerine, keep secondary as Green
5. **Loading States**: Use Tangerine for spinners and progress indicators
6. **Error States**: Red (#DC2626) for errors, not Tangerine

---

## 🚀 Next Steps

1. **Start with Student Dashboard** - Most straightforward
2. **Then Developer Dashboard** - More technical components
3. **Then Investor Dashboard** - Most complex data visualizations
4. **Test thoroughly** - Especially responsive layouts
5. **Update shared components** - Affects all dashboards
6. **Final QA pass** - Check entire dashboard suite

---

Last Updated: October 30, 2025
