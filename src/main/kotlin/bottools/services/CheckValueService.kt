package bottools.services

import bottools.commands.OnlineCommand
import org.slf4j.LoggerFactory
import java.io.IOException
import java.util.function.Consumer

abstract class CheckValueService protected constructor(private val packetName: String)
    : OnlineCommand(packetName.split('/')[1]), Runnable {
    private var interval = 0
    private var onChange: Consumer<String>? = null
    protected var packet: ServicePacketReaderBase
    private val log = LoggerFactory.getLogger(this::class.java)
    init {
        packet = ServicePacketReaderBase(packetName)
        println("Created service: $packetName")
    }

    private infix fun at(interval: Int) = this.also {
        this.interval = interval
    }

    private fun triggerResponce(newValue: String) = onChange!!.accept(newValue)


    private fun sleep(seconds: Int = interval) {
        try {
            Thread.sleep((seconds * 1000).toLong())
        } catch (e: InterruptedException) {
            // TODO Auto-generated catch block
            e.printStackTrace()
        }
    }

    operator fun invoke(args: Array<String?>?): Boolean {
        return false
    }

    private operator fun invoke() = Thread(this).start()

    override fun run() {
        initialSleep()
        while (true) {
            log.info("The service $name is starting a check")
            packet = ServicePacketReaderBase(packetName)
            loop()
            sleep()
        }
    }

    private fun initialSleep() {
        sleep(3)
    }

    protected abstract fun loop()
    private infix fun respondWith(onChange: Consumer<String>) = this.also{
        it.onChange = onChange
    }

    protected fun checkValues() =
        if (data != packet.oldValue) {
            log.debug("$name found a new value: $data")
            packet.oldValue = data!!
            triggerResponce(data!!)
        } else log.debug("$name detected no changes")

    protected fun navigate() {
        skipLines()
        disconnect()
        data = getValueFromKey(packet.keyName)
    }

    private fun skipLines() {
        packet.skipLineData.forEach { key: String ->
            try {
                skipLinesTo(key)
            } catch (e: IOException) {
                log.error("The service: $name has failed to perform a check")
            }
        }
    }

    companion object {
        @JvmStatic
        protected fun createService(service: CheckValueService, triggerAction: Consumer<String>, interval: Int) =
            (service respondWith triggerAction at interval)()
    }
    override fun invoke(args: Array<String>){}
}