import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000", {
      transports: ["websocket", "polling"],
      autoConnect: true,
    });

    socket.on("connect", () => {
      console.log("Connected to server:", socket?.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });
  }

  return socket;
};

export const subscribeToTransaction = (transactionId: string, callback: (data: any) => void) => {
  const socket = getSocket();
  
  // Subscribe to transaction-specific updates
  socket.emit("subscribe-transaction", transactionId);
  
  // Listen for stage updates
  socket.on("transaction-stage", callback);
  
  // Listen for general transaction updates
  socket.on("transaction-update", callback);
};

export const unsubscribeFromTransaction = (transactionId: string) => {
  const socket = getSocket();
  
  // Unsubscribe from transaction
  socket.emit("unsubscribe-transaction", transactionId);
  
  // Remove listeners
  socket.off("transaction-stage");
  socket.off("transaction-update");
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
