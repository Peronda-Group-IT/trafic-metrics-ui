export default function Loader({ size = 40, color = "black" }) {
    return (
        <>
            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
            <div
                style={{
                    width: size,
                    height: size,
                    border: `${size / 8}px solid #f3f3f3`, // Light gray border
                    borderTop: `${size / 8}px solid ${color}`, // Primary color border
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                }}
            />
        </>
    );
};
