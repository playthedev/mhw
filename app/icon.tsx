import { ImageResponse } from "next/og"

export const size = {
  width: 64,
  height: 64,
}
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 14,
          background: "#0c1f3f",
        }}
      >
        <span
          style={{
            fontSize: 38,
            fontWeight: 800,
            color: "#f4c542",
            fontFamily: "sans-serif",
          }}
        >
          M
        </span>
      </div>
    ),
    {
      ...size,
    }
  )
}
