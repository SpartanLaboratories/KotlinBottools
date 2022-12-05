package bottools.services

import java.util.function.Consumer

class ServiceCommand(serviceName: String) : CheckValueService(serviceName) {
    public override fun loop() {
        connect()
        navigate()
        checkValues()
    }

    public override fun connect(): Boolean {
        println("The service: $name is trying to connect")
        return super.connect(packet.uRL)
    }

    companion object {
        fun createService(serviceName: String, onChange: Consumer<String>, interval: Int) {
            createService(ServiceCommand(serviceName), onChange, interval)
        }
    }
}