trait MessageBroker {
  def sendMessage(message: String, queueName: String): Unit
  def receiveMessage(callback: String => Unit, queueName: String): Unit
}
