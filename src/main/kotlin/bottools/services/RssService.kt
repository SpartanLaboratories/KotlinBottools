
package bottools.services

import com.rometools.rome.feed.synd.SyndFeed
import com.rometools.rome.io.FeedException
import com.rometools.rome.io.SyndFeedInput
import com.rometools.rome.io.XmlReader
import java.io.IOException
import java.net.URL
import java.util.function.Consumer

class RssService protected constructor(serviceName: String?) : CheckValueService(serviceName!!) {
    var feed = SyndFeedInput().build(XmlReader(URL(packet.uRL)))

    override operator fun invoke() {
        println("Testing rss feed service")
        data = feed!!.entries[0].uri
        checkValues(packet.oldValue)
    }

    companion object {
        fun createService(serviceName: String, onChange: Consumer<Array<String>>, interval: Int) =
            createService(RssService(serviceName), onChange, interval)
    }
}