import Card from "../../shared/components/Card";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#F8FAFC",
        padding: 24,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
        }}
      >
        <Card>
          <h1
            style={{
              margin: 0,
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            DRAM
          </h1>

          <p
            style={{
              color: "#6B7280",
              marginTop: 12,
              marginBottom: 0,
            }}
          >
            Smart Personal Finance
          </p>
        </Card>
      </div>
    </main>
  );
}