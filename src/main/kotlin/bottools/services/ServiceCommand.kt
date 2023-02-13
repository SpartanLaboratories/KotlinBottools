package bottools.services

import java.util.function.Consumer

class ServiceCommand(serviceName: String) : CheckValueService(serviceName) {
    override operator fun invoke() {
        connect()
        navigate()
        checkValues(packet.oldValue)
    }

    public override fun connect(): String{
        println("The service: $name is trying to connect")
        return super.connect(packet.uRL)
    }

    companion object {
        fun createService(serviceName: String, onChange: TriggerAction, interval: Int):Unit =
            CheckValueService.createService(ServiceCommand(serviceName), onChange, interval)
    }
}