namespace Raidexi.Domain.Entities
{
    /// <summary>
    /// Body measurements (in centimetres) used for fashion design &amp; garment sizing.
    /// </summary>
    public class MeasureData
    {
        // ── Core sizing ─────────────────────────────────
        /// <summary>Horizontal distance across the back between the two shoulder points (cm).</summary>
        public float ShoulderWidth { get; set; }

        /// <summary>Circumference at the fullest part of the chest / bust (cm).</summary>
        public float Chest { get; set; }

        /// <summary>Circumference at the natural waistline (cm).</summary>
        public float Waist { get; set; }

        /// <summary>Circumference at the fullest part of the hips, ~20 cm below waist (cm).</summary>
        public float Hip { get; set; }

        /// <summary>Total standing height from floor to top of head (cm).</summary>
        public float Height { get; set; }

        // ── Upper body ──────────────────────────────────
        /// <summary>Circumference around the base of the neck (cm). Used for collars &amp; necklines.</summary>
        public float Neck { get; set; }

        /// <summary>
        /// Length from the shoulder point, down the outer arm, to the wrist bone (cm).
        /// Used for sleeve length in shirts, jackets &amp; coats.
        /// </summary>
        public float SleeveLength { get; set; }

        /// <summary>Circumference of the armhole opening on a garment (cm). Used for sleeve caps.</summary>
        public float ArmHole { get; set; }

        /// <summary>Circumference around the upper arm at its fullest point (cm).</summary>
        public float UpperArm { get; set; }

        // ── Lower body ──────────────────────────────────
        /// <summary>
        /// Inside leg length from the crotch to the floor (cm).
        /// Core measurement for trousers &amp; jeans inseam.
        /// </summary>
        public float Inseam { get; set; }

        /// <summary>
        /// Vertical distance from the waist to the bottom of the crotch while seated (cm).
        /// Used for crotch depth / rise in trousers &amp; skirts.
        /// </summary>
        public float CrotchDepth { get; set; }

        /// <summary>Circumference around the fullest part of the thigh (cm). Used for trousers fit.</summary>
        public float Thigh { get; set; }

        /// <summary>Total outside leg length from waist to floor (cm). Used for overall trouser length.</summary>
        public float OutseamLength { get; set; }
    }
}

