# Taxi Alica — Fleet Turntables & Photography Media Repository

This repository hosts all vehicle 360-degree turntable image sequences, cardinal angle captures, high-resolution fleet photography, vehicle specifications data, and interactive 360 viewer components for Taxi-Alica Freiburg.

## Fleet Vehicles & Assets

| Vehicle | Color | Turntable Frames | Cardinal Angles | Category |
| :--- | :--- | :--- | :--- | :--- |
| **Mercedes-Benz E 220 d** | Polar White | 72 frames (5° step) | 8 angles (0°, 45°, 90°, etc.) | Premium Limousine |
| **Mercedes-Benz Vito Tourer** | Obsidian Black | 72 frames (5° step) | 8 angles (0°, 45°, 90°, etc.) | Großraumtaxi (8 Pax) |
| **Volvo S90 Inscription** | Crystal White | 72 frames (5° step) | 8 angles (0°, 45°, 90°, etc.) | Luxury Sedan |
| **Volvo V90 Cross Country** | Onyx Black | 72 frames (5° step) | 8 angles (0°, 45°, 90°, etc.) | Kombi / Estate |

## Directory Structure

```
├── components/fleet/
│   ├── Car360Viewer.tsx     # React interactive 360 drag/inertia viewer
│   └── FleetRealGallery.tsx # High-resolution photo gallery with modal lightbox
├── exported_rotations/      # Master source turntable sequences
│   ├── 01_mercedes_e220_white/
│   ├── 02_mercedes_vito_black/
│   ├── 03_volvo_s90_white/
│   └── 04_volvo_v90_black/
├── lib/
│   ├── fleet.ts             # Vehicle specs, dimensions, seat counts, image manifests
│   └── base-path.ts
├── public/cars/             # Web-optimized assets
│   ├── 01_mercedes_e220_white/
│   │   ├── 01_cardinal_8_angles/
│   │   └── 02_turntable_72_frames/
│   ├── 02_mercedes_vito_black/
│   ├── 03_volvo_s90_white/
│   ├── 04_volvo_v90_black/
│   ├── alle_autos.jpg       # Complete fleet group photograph
│   ├── bus_innen.jpg        # Minivan interior seating
│   ├── bus_tuer.jpg         # Boarding sliding door view
│   ├── gemini_fleet_showcase.jpg
│   └── mercedes_e220_hero.png
├── scratch/                 # Video interpolation, plate editing & crop scripts
├── index.html               # Standalone interactive 360 viewer & gallery web page
└── package.json
```

## Quick Start (Standalone Preview)

To spin the cars and browse photographs immediately without any framework:

```bash
# Start local static server
npm run dev

# Open in browser: http://localhost:3002
```

## Conventions

- **Frame Naming**: `<model>_frame_<index>_<deg>deg.jpg` (e.g. `mercedes_e220_frame_00_000deg.jpg` to `mercedes_e220_frame_71_355deg.jpg`).
- **Rotation Direction**: Clockwise from front (0° = front bumper, 90° = passenger side profile, 180° = rear, 270° = driver side profile).
- **Aspect Ratio**: Turntables are framed 16:9 with consistent vehicle centering.

## Integration with Web App (`taxi-web`)

- Symlink or copy `public/cars` into `taxi-web/public/cars`.
- Symlink or copy `components/fleet` and `lib/fleet.ts` into `taxi-web`.
